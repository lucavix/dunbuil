import { Room } from './room';

export class StdRoom extends Room {
    roomType: string = "StdRoom";
    isIn(x: number, y: number): boolean {
        return true;        
    }
}