#! /usr/bin/env node

const { execSync } = require('child_process')

const runCommand = command => {
    try {
        return execSync(`${command}`, { stdio: 'inherit' })
    } catch (error) {
        console.error(`Field to execute ${command}`, error)
        return false
    }
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const createDir = "mkdir apps-playground"
const setRegistry = "cd apps-playground && npm config set @dladio:registry https://npm.pkg.github.com"

readline.question(`Enter your github token: `, token => {
    readline.close();
    if (!token) process.exit(-1)

    const setUserAuth = `cd apps-playground && npm config set //npm.pkg.github.com/:_authToken ${token}`

    console.log(`Creating Directories`)
    try {
        const makeDir = runCommand(createDir)
    } catch (error) {
        console.log(error);
    }

    console.log(`Configuring npm...`)
    const registry = runCommand(setRegistry)
    // if (!registry) process.exit(-1)

    const auth = runCommand(setUserAuth)
    // if (!auth) process.exit(-1)

    console.log(`Successful`)
});