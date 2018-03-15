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