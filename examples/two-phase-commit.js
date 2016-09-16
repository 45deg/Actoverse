// two phase commit
class Coordinator extends Actor {
    constructor(cohorts) {
        super();
        this.cohorts = cohorts;
        this.responses = [];
    }
    receive(command, arg){
        if(command === 'start_2pc') {
            this.broadcast('query', this.pid);
        } else if(command === 'agreement') {
            this.responses.push(arg);
            if(this.responses.length === this.cohorts.length) {
                // finished  
                if(this.responses.every(e => e)) {
                    this.broadcast('commit', this.pid);
                } else {
                    this.broadcast('rollback', this.pid);
                }
                this.responses = [];
                this.become('waitAcknowledgements');
            }
        }
    }
    waitAcknowledgements(arg){
        this.responses.push(arg);
        if(this.responses.length === this.cohorts.length) {
            this.exit();
        }
    }
    broadcast(...args){
        for(let cohort of this.cohorts) {
            this.send(cohort, ...args);
        }
    }
}

// cohort
class Cohort extends Actor {
    constructor(decision) {
        super();
        this.decision = decision;
    }
    receive(command, pid){
        if(command === 'query') {
            this.send(pid, 'agreement', this.decision);
        } else if(command === 'commit') {
            // commit code here
            this.send(pid, 'commit');
        } else if(command === 'rollback') {
            // rollback code here
            this.send(pid, 'rollback');
        }
    }
}

send(0, spawn(Coordinator, [
            spawn(Cohort, true), 
            spawn(Cohort, !true), 
            spawn(Cohort, true),
            spawn(Cohort, true), 
            spawn(Cohort, !true), 
            spawn(Cohort, true),
]), 'start_2pc');
