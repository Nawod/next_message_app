import { MessageItem } from "../models/message";
import { UniqueId } from "../models/uniqueId";

export class DummyData {
    public static readonly MESSAGES : Array<MessageItem> = [
        {
            id : UniqueId.getUniqueId(),
            user: {
                id : UniqueId.getUniqueId(),
                image : '/users/u2.jpg',
                name : 'maxblagun'
            },
            updatedAt : new Date('2024.10.07').toISOString(),
            priorityValue : 5,
            message : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            reply : [
                {
                    id : UniqueId.getUniqueId(),
                    user: {
                        id : UniqueId.getUniqueId(),
                        image : '/users/p4.jpg',
                        name : 'ramsemiron'
                    },
                    updatedAt : new Date('2024.10.08').toISOString(),
                    priorityValue : 4,
                    message : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                },
                {
                    id : UniqueId.getUniqueId(),
                    user: {
                        id : 'c1235',
                        name: 'juliusomo',
                        image : '/users/p3.jpg'
                    },
                    updatedAt : new Date('2024.10.08').toISOString(),
                    priorityValue : 2,
                    message : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                },

            ]
        },
        {
            id : UniqueId.getUniqueId(),
            user: {
                id : UniqueId.getUniqueId(),
                image : '/users/u1.jpg',
                name : 'amyrobson'
            },
            updatedAt : new Date('2024.09.25').toISOString(),
            priorityValue : 12,
            message : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
    ]
}