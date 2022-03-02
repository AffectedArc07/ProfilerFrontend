# Paradise Profiler Frontend

React webapp for visualising profiler data from the Paradise Public API (<https://api.paradisestation.org/>).

## Building

1. Run `npm ci` to make sure you have all dependencies installed
2. Run `npm run build` to build the project. All the files you need to deploy can then be found in `dist`.
2.1 The build might take a while. The chart library has 2 megabytes that needs shading in for some reason.

## Developing

Run `npm run start` to launch the WebPack dev server.

## License

This project is licensed under AGPL-3. You can find a copy of this license in the file `LICENSE.MD`.
