# DevExtreme Demos
 
This repository contains technical DevExtreme demos for Angular, React, Vue, jQuery, ASP.NET MVC, and ASP.NET Core.

To run the demos on your machine, clone this repository, run `npm install`, and follow the instructions below.

## Prepare Demos for Development

To prepare demos for development, you can run a script for all technologies or scripts for JavaScript and ASP.NET individually:

```
npm run prepare-all
```
```
npm run prepare-js
```
```
npm run prepare-aspnet
```

Angular, Vue, and React demos can use bundles instead of separate files from `node_modules`. With bundles, demos launch faster but become harder to debug. Run the following command to create the bundles and replace the SystemJS configuration:

```
npm run prepare-bundles
```

To return to using separate files from `node_modules`, run `npm run prepare-js`.


## JavaScript Demos

### Launch

1. Run the launch script:

    ```
    npm run launch-demo
    ```

1. Navigate to http://localhost:3000/.

You can pass additional parameter to specify port. It can be useful when you need to fast switching beatween one demo on different frameworks:

```
npm run launch-demo -- 3010
```

### Before Commiting Сhanges

For fix autofixed errors:

```
npm run fix-lint
```

### Development

1. Run the following script to add a new demo:

    ```
    npm run add-demo
    ```

1. Use the built-in CLI to choose or enter the category, the demo name, and the technology for the new demo.

### TS React Infrastructure

1. After you make any changes in React TypeScript sources, run the following command:  

```
npm run convert-to-js ./JSDemos/Demos/**/React
```

1. To ensure that React JavaScript and TypeScript sources are always in sync, the following GitHub action is used: "Check generated JS demos".

## ASP.NET Demos

> **_NOTE:_** You will need Windows. 

1. Clone the [devextreme-aspnet](https://github.com/DevExpress/devextreme-aspnet) repo.

1. Open the `repository.config.json` file, set the `devextreme-aspnet` property to the path where your clone of the `devextreme-aspnet` repository is located, and set the `devextreme` property to the path DevExtreme repo if you want to use local devextreme dist. For example:

    ```json
    {
      "devextreme": "C:/Work/DevExtreme",
      "devextreme-aspnet": "C:/Work/devextreme-aspnet"
    }
    ```

1. Prepare ASP.NET demos for launch and development. Run this command in the `devextreme-demos` repository.
    ```
    npm run prepare-all
    ```
    For this, you need .NET Framework 4.5.2 installed on your device. You can download a full Developer Pack here: [.NET 4.5.2 Developer Pack Installer](https://dotnet.microsoft.com/en-us/download/dotnet-framework/thank-you/net452-developer-pack-offline-installer).

1. Open the `NetCoreDemos/DevExtreme.NETCore.Demos.sln` or `MVCDemos/DevExtreme.MVC.Demos.sln` project in Visual Studio and add or edit demos there.

## See Also

- [Technical demos online](https://js.devexpress.com/Demos/)
- [Examples on GitHub](https://github.com/DevExpress/DevExtreme-examples)
