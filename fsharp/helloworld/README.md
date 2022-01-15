# F# 入門

## 環境構築

```bash
# 使用可能なテンプレートを検索する
dotnet new --list

# F#のプロジェクトをカレントディレクトリで初期化する
dotnet new console --language "F#" --output ./
```

また VSCode の拡張機能として以下をインストールするように設定しておく。

```json
{
  "recommendations": ["Ionide.Ionide-fsharp", "ms-dotnettools.csharp"]
}
```
