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