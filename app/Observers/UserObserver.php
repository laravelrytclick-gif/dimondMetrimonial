<?php

namespace App\Observers;

use App\Models\User;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        //
    }

    /**
     * Handle the User "updated" event.
     */
   public function updated(User $user)
    {
        // sirf tab log karo jab kuch change hua ho
        if ($user->isDirty()) {
            audit_log(
                entity: 'users',
                entityId:$user->id,
                action:'UPDATE',
                oldData:$user->getOriginal(),
                newData:$user->getDirty()
            );
        }
    }

    /**
     *   
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        //
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}
