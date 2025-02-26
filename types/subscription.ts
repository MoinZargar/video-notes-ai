export interface SubscriptionCreate{
    plan_id:number,
    customer_notify:number,
    notes:{
        userId:number
    }
}
