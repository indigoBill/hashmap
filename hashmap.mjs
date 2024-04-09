import { LinkedList } from './linkedList.mjs';

const HashMap = function(){
    const allBuckets = [];
    let allBucketsSize = 16;
    allBuckets.length = allBucketsSize;

    function hash(key){
        const primeNumber = 31;
        let hashCode = 0;

        for(let i = 0; i < key.length; i++){
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % allBuckets.length;
        }

        return hashCode;
    }
    
    function set(key, value){
        const index = hash(key);
        const bucket = allBuckets[index];
        const capacityFilled = this.length() / allBucketsSize;
        const loadFactor = 0.75;

        if(capacityFilled >= loadFactor){
            const keyValArr = this.entries();
            this.clear();
            allBucketsSize *= 2;
            allBuckets.length = allBucketsSize;

            keyValArr.forEach((keyVal) => {
                this.set(keyVal[0], keyVal[1]);
            });
        }

        if(!bucket){
            allBuckets[index] = new LinkedList();
            allBuckets[index].append({[key] : value});
            return;
        }

        Object.values(bucket['list']).forEach((nodeObj, index) => {
            if(!nodeObj){
                bucket.append({[key] : value});
                return;
            }
            
            if(Object.hasOwn(nodeObj['value'], key)){
                nodeObj['value'][key] = value;
                return;
            }
            
            if(!(Object.hasOwn(nodeObj['value'], key)) && index === Object.values(bucket['list']).length - 1){
                bucket.append({[key] : value});
                return;
            }
        });

    }

    function get(key){
        const index = hash(key);
        const bucket = allBuckets[index];
        let value = null;

        if(!bucket){
            return value;
        }

        Object.values(bucket['list']).forEach((nodeObj) => {
            if(Object.hasOwn(nodeObj['value'], key)){
                value = nodeObj['value'][`${key}`];
            }
        });

        return value;
    }

    function has(key){
        const index = hash(key);
        const bucket = allBuckets[index];
        let keyExists = false;

        if(!bucket){
            return keyExists;
        }

        Object.values(bucket['list']).forEach((nodeObj) => {
            if(Object.hasOwn(nodeObj['value'], key)){
                keyExists = true
            }
        });
        
        return keyExists;
    }

    function remove(key){
        const index = hash(key);
        const bucket = allBuckets[index];

        if(bucket){
            Object.values(bucket['list']).forEach((nodeObj, index) => {
                if(Object.hasOwn(nodeObj['value'], key)){
                    bucket.removeAt(index);
                }
            });

            return true;
        }else{
            return false;
        }
    }

    function length(){
        return this.keys().length;
    }

    function clear(){
        allBuckets.forEach((bucket) => {
            while(bucket.size() > 0){
                bucket.pop();
            }
        });
    }

    function keys(){
        const allKeys = [];

        allBuckets.forEach((bucket) => {
           const linkedListValArr = Object.values(bucket['list']);

            linkedListValArr.forEach((obj) => {
                if(obj){
                    allKeys.push(Object.keys(obj['value']));
                }
            });
        });

        return allKeys.flat();
    }

    function values(){
        const allValues = [];

        allBuckets.forEach((bucket) => {
            const linkedListValArr = Object.values(bucket['list']);

            linkedListValArr.forEach((obj) => {
                if(obj){
                    allValues.push(Object.values(obj['value']));
                }
           });
        });

        return allValues.flat();
    }

    function entries(){
        const allEntries = [];
        const keyArr = this.keys();
        const valArr = this.values();

        keyArr.forEach((key, index) => {
            allEntries.push([key, valArr[index]]);
        });

        return allEntries;
    }

    return { hash, set, get, has, remove, length, clear, keys, values, entries };
}





