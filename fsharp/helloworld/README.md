# F# 入門

## 環境構築

```bash
# dotnetのバージョン情報を確認する
dotnet --version
dotnet --info

# 使用可能なテンプレートを検索する
dotnet new --list

# F#のプロジェクトをカレントディレクトリで初期化する
dotnet new console --language "F#" --output ./

# 初期作成されたファイルを実行する
dotnet run
```

また VSCode の拡張機能として以下をインストールするように設定しておく。

```json
{
  "recommendations": ["Ionide.Ionide-fsharp", "ms-dotnettools.csharp"]
}
```

これで以下のようなプロジェクトの設定ファイルが初期化されている。

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <Compile Include="Program.fs" />
  </ItemGroup>

</Project>
```

F#のプログラムをデバッグするためには、上記の `TargetFramework` の情報を使用する。

まずはデバッグファイルを生成した後で、`.NET Console App` を選択してコンソールアプリ用のデバッグ設定を選択する。その後で必要な情報を入力する。

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": ".NET Core Launch (console)",
      "type": "coreclr",
      "request": "launch",
      "preLaunchTask": "build",
      // 以下に必要な情報を入力する必要がある
      "program": "${workspaceFolder}/bin/Debug/net6.0/helloworld.dll",
      // デバッグする際に引数を使用する場合はここに設定する
      "args": [],
      "cwd": "${workspaceFolder}",
      "stopAtEntry": false,
      "console": "internalConsole"
    }
  ]
}
```

あとはビルドを行うためのタスクファイルを作成する。

```json
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "label": "build",
      "command": "dotnet",
      "type": "shell",
      "args": [
        "build",
        // Ask dotnet build to generate full paths for file names.
        "/property:GenerateFullPaths=true",
        // Do not generate summary otherwise it leads to duplicate errors in Problems panel
        "/consoleloggerparameters:NoSummary"
      ],
      "group": "build",
      "presentation": {
        "reveal": "silent"
      },
      "problemMatcher": "$msCompile"
    }
  ]
}
```

これで F#のプログラムを実行してデバッグを行う設定が完了した。
