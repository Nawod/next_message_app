/**
 * @class UniqueId
 * @description purpose of this function is to generate unique ids
 * @author Nawod Madhuvantha
*/

export class UniqueId {
    public static getUniqueId() {
        const uniqueId = (Date.now() * Math.random()).toString();
        return uniqueId;
      }
}