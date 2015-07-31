var remote = require('remote')
var remoteConsole = remote.require('console')

// we have to do this so that mocha output doesn't look like shit
var originalLog = console.log
console.log = function () {
  remoteConsole.log.apply(remoteConsole, arguments)
  if (window.__args__.interactive) {
    originalLog.apply(console, arguments)
  }
}

var originalDir = console.dir
console.dir = function () {
  remoteConsole.dir.apply(remoteConsole, arguments)
  if (window.__args__.interactive) {
    originalDir.apply(console, arguments)
  }
}

// if we don't do this, we get socket errors and our tests crash
Object.defineProperty(process, 'stdout', {
  value: {
    write: function (msg) {
      console.log.apply(console, arguments)
    }
  }
})
