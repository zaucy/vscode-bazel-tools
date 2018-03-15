interface CommandExecutor {

    // In: command string, e.g. 'bazel build //target'
    // Out: standard terminal output
    run_command(command:string) : Promise<string>
}

class EmptyExecutor implements CommandExecutor {
    async run_command(command:string) : Promise<string> {
        return command
    }
}

class BasicShellExecutor implements CommandExecutor {
    async run_command(command:string) : Promise<string> {
        return command
    }
}

class VscodeBuiltinTerminalExecutor implements CommandExecutor {
    async run_command(command:string) : Promise<string> {
        return command
    }
}