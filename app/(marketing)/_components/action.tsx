import { actions } from '@/constants/actions'
import { ActionCard } from './action-card';

export  function Action() {
  return (
    <div className="p-4 ">
      <div className="text-sm uppercase font-medium  tracking-wide ">
        Coll8er in action
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold my-3">
        Workflows for any project, big or small.
      </h2>

      <div className="my-6 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-3">
       {
        actions.map(action => (
            <ActionCard key={action.color} action={action} />
        ))
       }
      </div>
    </div>
  )
}
