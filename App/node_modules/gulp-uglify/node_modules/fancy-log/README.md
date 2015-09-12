# fancy-log
Log things, prefixed with a timestamp

__This module was pulled out of gulp-util for use inside the CLI__

## Usage

```js
var log = require('fancy-log');

log('a message');
// [16:27:02] a message
```

## API

### log(msg...)

Logs the message as if you called `console.log` but prefixes the output with the
current time in HH:MM:ss format.

## License

MIT
