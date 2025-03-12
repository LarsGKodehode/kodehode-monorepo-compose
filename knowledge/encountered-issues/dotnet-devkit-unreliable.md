---
topic: encountered-problem
---
# .NET DevKit Unreliable

The latest version of .NET DevKit (1.15.x) breaks IntelliSense, at least for this "microservice" based repository.

## Fix

The current solution is to lock the C# DevKit version to an earlier one, v1.5.20 works.

## References

- [GitHub Issue](https://github.com/microsoft/vscode/issues/212296#issuecomment-2110019698)
