export type Pricing = {
    type : string;
    price : number;
    description : string;
    features : string[]
}

export const pricing : Pricing[] = [
    {
        type : "free",
        price : 0,
        description : "For individuals or teams looking to organize any project.",
        features : [
            "Free Up to 5 team boards",
            "Basic task management",
            "Collaboration with team members",
            "Basic integrations"
        ]
    },
    {
        type : "premium",
        price : 25,
        description : "For teams that need to track and visualize multiple projects.",
        features : [
            "unlimited board creation",
            "Free Up to 5 team boards",
            "Basic to advanced task management",
            "Collaboration with team members",
            "Advanced integrations",
            "Admin security features",
            "Activity logs for the past 7 days",
            "Advanced checklists"
        ]
    },
]

