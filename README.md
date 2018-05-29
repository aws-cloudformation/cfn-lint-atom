## AWS Cfn Lint Atom

![Preview](cfn-linter.png)

Provides IDE specific integration to cfn-lint. https://github.com/awslabs/cfn-python-lint

## Requires
#### cfn-lint
For atom-cfn-lint to work you need to have cfn-lint installed.
```pip install cfn-lint```

#### JSON/YAML Templates
Atom-cfn-lint is coded to work with JSON and YAML files but the goal is to only scan CloudFormation templates.  As a result we look for `AWSTemplateFormatVersion` being defined in the file.  CloudFormation only requires `Resources` to be defined but this is too generic for assuming that the file is a CloudFormation template.

## License

This library is licensed under the Apache 2.0 License.
