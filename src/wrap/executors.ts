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