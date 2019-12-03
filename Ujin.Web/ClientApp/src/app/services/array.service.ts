import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ArrayService {

    constructor() { }

    public remove<T>(arr: T[], el: T) {
        if (arr == null) return;
        let ind = arr.indexOf(el);
        if (ind >= 0)
            arr.splice(ind, 1);
    }

    public removeByCond<T>(arr: T[], cond: (el: T) => boolean) {
        if (arr == null) return;
        let ind = arr.findIndex(cond);
        if (ind >= 0)
            arr.splice(ind, 1);
    }

    public intersect<T>(arr1: T[], arr2: T[]): T[] {
        return arr1.filter(it => arr2.find(it2 => it2 === it) != null);
    }

    public distinct<T>(arr: T[]): T[] {
        return arr.filter((el, ind) => arr.indexOf(el) === ind);
    }
}
