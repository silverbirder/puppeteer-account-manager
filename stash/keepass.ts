const kdbxweb = require('kdbxweb')
const fs = require('fs')
const path = require("path")
const util = require('util')
fs.readFileAsync = util.promisify(fs.readFile)

const read = async () => {
    const keyFileArrayBuffer = await fs.readFileAsync(path.join(__dirname, './', 'file.key'));
    const dataAsArrayBuffer = await fs.readFileAsync(path.join(__dirname, './', 'password.kdbx'));

    const credentials = new kdbxweb.Credentials(
        kdbxweb.ProtectedValue.fromString('PASSWORD'),
        keyFileArrayBuffer.buffer
    );

    const db = await kdbxweb.Kdbx.load(dataAsArrayBuffer.buffer, credentials)

    const entry = db.getDefaultGroup()

    return entry
}

read()
    .then((result) => {
        console.log('result', result)
    })
    .catch((err) => {
        console.log('err', err)
    })