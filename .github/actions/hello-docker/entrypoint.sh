#!/bin/sh

echo "::debug ::Debug Message"
echo "::warning ::Warning Message"
echo "::error ::Error Message"

echo "::add-mask::$1"
echo "Hello $1"
time=$(date)
echo "::set-output name=time::$time"

echo "::group::Some expandable logs"
echo "some stuff"
echo "other stuff"
echo "::endgroup::"

#echo "::set-env name=HELLO::hello" # The `set-env` command is disabled: https://github.blog/changelog/2020-10-01-github-actions-deprecating-set-env-and-add-path-commands/