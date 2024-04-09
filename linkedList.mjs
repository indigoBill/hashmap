const NewNode = function(value = null, nextNode = null){

    return { value, nextNode };
}

export class LinkedList {

    list = {
        head : null,
    };

    append(value){
        if(this.list['head'] === null){
            this.list['head'] = NewNode(value);
        }else{
            const nodeSuffix = Object.values(this.list).length;

            this.list[`node_${nodeSuffix}`] = NewNode(value);
            Object.values(this.list)[nodeSuffix-1]['nextNode'] = this.list[`node_${nodeSuffix}`];
        }

        return this.list;
    }

    prepend(value){
        let nodeSuffix = 1;
        const length = Object.values(this.list).length;

        this.list['head'] = NewNode(value, this.list['head']);

        while(nodeSuffix <= length){
            if(nodeSuffix === 1){
                this.list[`node_${nodeSuffix}`] = this.list['head']['nextNode'];
            }else{
                this.list[`node_${nodeSuffix}`] = this.list[`node_${nodeSuffix - 1}`]['nextNode'];
            }
            
            nodeSuffix++;
        }

        return this.list;
    }

    size(){
        let size = 0;

        for(const prop in this.list){
            if(prop === 'head' && this.list['head'] === null) return size;
            
            size++;
        }

        return size;
    }

    head(){
        return this.list['head'];
    }

    tail(){
        const lastNodeSuffix = Object.values(this.list).length - 1;
    
        return this.list[`node_${lastNodeSuffix}`];
    }

    at(index){
        if(index === 0){
            return this.list['head'];
        }

        return this.list[`node_${index}`];
    }

    pop(){
        if(this.size() === 1){
            delete this.list['head'];
            this.list['head'] = null;
        }else{
            const lastNodeSuffix = Object.values(this.list).length - 1;

            delete this.list[`node_${lastNodeSuffix}`];

            if(lastNodeSuffix === 1){
                this.list['head']['nextNode'] = null;
            }else{
                this.list[`node_${lastNodeSuffix - 1}`]['nextNode'] = null;
            }   
        }

        return this.list;
    }

    contains(value){
        for(const prop in this.list){
            if (this.list[prop]['value'] === value) return true;
        }

        return false;
    }

    find(value){
        for(const prop in this.list){
            if(this.list[prop]['value'] === value){
                if(prop === 'head') return 0;
                
                return prop.split('_')[1];
            }
        }

        return null;
    }

    toString(){
        const str = ' ';
        let finalString = '';

        const arr = Object.values(this.list);

        arr.forEach((object, index) => {
            const value = object['value'];
            let outputString;

            if(index !== arr.length - 1){
                outputString = `( ${value} ) ->`;
            }else{
                outputString = `( ${value} ) -> null`;
            }

            finalString += str.concat(outputString);
        });

        return finalString;
    }

    insertAt(value, index){
        const length = Object.values(this.list).length;

        if(index === 0){
            prepend(value);
        }else if(index >= length){
            append(value);
        }else{
            let nodeSuffix = index + 1;

            this.list[`node_${index}`] = NewNode(value, this.list[`node_${index}`]);

            if(index - 1 === 0){
                this.list['head']['nextNode'] = this.list[`node_${index}`];
            }else{
                this.list[`node_${index - 1}`]['nextNode'] = this.list[`node_${index}`];
            }

            while(nodeSuffix <= length){
                this.list[`node_${nodeSuffix}`] = this.list[`node_${nodeSuffix - 1}`]['nextNode'];
                nodeSuffix++;
            }
        }

        return this.list;
    }

    removeAt(index){
        const length = Object.values(this.list).length;
        let nodeSuffix = 1;

        if(index === 0){
            this.list['head'] = this.list['head']['nextNode'];
        }else if(index === length - 1){
            pop();
            return;
        }else{
            this.list[`node_${index}`] = this.list[`node_${index}`]['nextNode'];

            if(index - 1 === 0){
                this.list['head']['nextNode'] = this.list[`node_${index}`];
            }else{
                this.list[`node_${index - 1}`]['nextNode'] = this.list[`node_${index}`];
            }

            nodeSuffix = index + 1;
        }

        while(nodeSuffix < length){
            if(nodeSuffix !== length - 1){
                this.list[`node_${nodeSuffix}`] = this.list[`node_${nodeSuffix}`]['nextNode'];
            }else{
                delete this.list[`node_${nodeSuffix}`];
            }

            nodeSuffix++;
        }

        return this.list;
    }
}
