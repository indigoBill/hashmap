import { LinkedList } from './linkedList.mjs';

const HashSet = function(){
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
    
    function set(key){
        const index = hash(key);
        const bucket = allBuckets[index];
        const capacityFilled = this.length() / allBucketsSize;
        const loadFactor = 0.75;

        if(capacityFilled >= loadFactor){
            const keyValArr = this.keys().concat([key]);
            this.clear();
            allBucketsSize *= 2;
            allBuckets.length = allBucketsSize;

            keyValArr.forEach((keyVal) => {
                this.set(keyVal);
            });

            return;
        }

        if(!bucket){
            allBuckets[index] = new LinkedList();
            allBuckets[index].append(key);

            return;
        }

        Object.values(bucket['list']).forEach((nodeObj, index) => {
            if(!nodeObj){
                bucket.append(key);
                return;
            }
            
            if(nodeObj['value'] === key){
                return;
            }
            
            if(nodeObj['value'] !== key && index === Object.values(bucket['list']).length - 1){
                bucket.append(key);
                return;
            }
        });
    }

    function has(key){
        const index = hash(key);
        const bucket = allBuckets[index];
        let keyExists = false;

        if(!bucket){
            return keyExists;
        }

        Object.values(bucket['list']).forEach((nodeObj) => {
            if(nodeObj['value'] === key){
                keyExists = true;
            }
        });

        return keyExists;
    }

    function remove(key){
        const index = hash(key);
        const bucket = allBuckets[index];

        if(bucket){
            Object.values(bucket['list']).forEach((nodeObj, index) => {
                if(nodeObj['value'] === key){
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
                    allKeys.push(obj['value']);
                }
            });
        });

        return allKeys.flat();
    }

    return { hash, set, has, remove, length, clear, keys };
}
