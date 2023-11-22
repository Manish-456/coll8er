import { ActionType } from "@/constants/actions"
import { cn } from "@/lib/utils";

interface ActionCardProps {
    action : ActionType
}
export function ActionCard({action} : ActionCardProps){
    const Icon = action.icon;
    return (
        <div key={action.color} className='relative shadow-md hover:shadow-lg h-full bg-white'>
        <div className={cn("h-14 relative", {
                "bg-orange-400" : action.color === "orange",
                "bg-yellow-400" : action.color === "yellow",
                "bg-green-400" : action.color === "green",
            })} />
        <div className="absolute rounded-md top-6 left-4 p-3 bg-white">
            <Icon className={cn(`h-8 w-8`, {
                "fill-orange-400 text-orange-400" : action.color === "orange",
                "fill-yellow-400 text-yellow-400" : action.color === "yellow",
                "fill-green-400 text-green-400" : action.color === "green",
            })} />
        </div>
        <div className="p-4 mt-4 ">
            <h3 className='text-lg font-medium mb-2'>{action.title}</h3>
            <p className='text-sm font-medium text-slate-700'>{action.description}</p>
            
        </div>
    </div>
    )
}