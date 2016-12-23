import { Mongo } from 'meteor/mongo';
 
export const Numbers = new Mongo.Collection('numbers');
export const Groups = new Mongo.Collection('groups');
export const Responses = new Mongo.Collection('responses');