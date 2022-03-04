const core = require('@actions/core')
const execa = require('execa').execa

const getWorkspaces = async () => {
  const { exitCode, stdout, stderr } = await execa(
    'yarn',
    [
      'workspaces',
      'info'
    ],
    {
      reject: false,
    }
  )

  if (exitCode !== 0) {
    console.log(stderr)
    return
  }

  const res = stdout.split('\n').slice(1, -1)

  return JSON.parse(res.join('\n'))
}

const run = async () => {
  try {
    const parallelMatrixInput = core.getInput('parallel_matrix')
    const parallelGroups = parseInt(core.getInput('parallel_groups'))

    const workspaces = await getWorkspaces()

    core.setOutput('isMonorepo', !!workspaces)

    let groups = workspaces ? Object.entries(workspaces) : [['default', { location: './' }]]

    // custom matrix
    if (parallelMatrixInput) {
      const parallelMatrix = JSON.parse(parallelMatrixInput)

      if (!Array.isArray(parallelMatrix)) {
        throw new Error('"parallel_matrix" input must be an array')
      }

      groups = parallelMatrix.map(({ pkg, location, parallel_groups }) => [
        pkg,
        { location, parallel_groups }
      ])
    }

    const matrix = groups.reduce((acc, [pkg, { location, parallel_groups }]) => {
      Array(parallel_groups || parallelGroups).fill().forEach((_, index) => acc.push({
        pkg,
        location,
        index,
        total: parallel_groups,
      }))

      return acc
    }, [])

    core.setOutput('matrix', {
      include: matrix
    })

  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
