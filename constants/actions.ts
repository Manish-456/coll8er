import { Folder, Leaf, List, LucideIcon } from "lucide-react";

export type ActionType = {
  title : string;
  description : string;
  icon : LucideIcon,
  color : string;
}

export const actions : ActionType[] = [
    {
        title : "Project management",
        description : "Keep tasks in order, deadlines on track, and team members aligned with Coll8er",
        icon : Folder,
        color : "orange"
    },
    {
        title : "Onboarding",
        description : "Onboarding to a new company or project is a snap with Coll8er's visual layout of to-do's, resources, and progress tracking.",
       icon : Leaf,
        color : "green"
    },
    {
        title : "Task management",
        description : "Use Coll8er to track, manage, complete, and bring tasks together like the pieces of a puzzle, and make your team's projects a cohesive success everytime.",
        icon : List,
        color : "yellow"
    }
]
