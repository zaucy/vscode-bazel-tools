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

abstract class BazelCommand {
    private args: string[] = []
    private executor: CommandExecutor = new EmptyExecutor
    constructor(cmd:string) {
        this.args.push(cmd)
    }
    protected addNamedArg(name:string, arg:string) {
        this.args.push('--'+name+'='+arg)
    }
    protected setFlag(name:string) {
        this.args.push('--'+name)
    }
    protected addPositionalArg(arg:string) {
        this.args.push(arg)
    }

    deletePackages(packages : string[]) {
        if(packages.length) {
            this.addNamedArg('delete_packages',
                '"'+packages.join(',')+'"')
        }
        return this
    }

    async execute() {
        return this.executor.run_command(
            'bazel' + this.args.join(' '))
    }
}
class BuildCommand extends BazelCommand {
    private target : string
    constructor(target:string) {
        super('build')
        this.target = target
    }

    async execute() {
        this.addPositionalArg(this.target)
        return super.execute()
    }
}

class QueryCommand extends BazelCommand {
    constructor() {
        super('query')
    }

}

class CleanCommand extends BazelCommand {
    constructor() {
        super('clean')
    }
    withExpunge() {
        this.setFlag('expunge')
        return this
    }
}

export class BazelCommandBuilder {

    build(target:string) : BuildCommand {
        var cmd = new BuildCommand(target)
        return cmd
    }

    clean() : CleanCommand {
        var cmd = new CleanCommand
        return cmd
    }
}