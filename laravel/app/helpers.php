<?php

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

if (!function_exists('nrh_dateTime')) {
    function nrh_dateTime($date)
    {
        return Carbon::parse($date)->format('d-m-Y H:i:s');
    }
}

if (!function_exists('getRole')) {
    function getRole()
    {
        $user = Auth::user();

        if (!$user) return 'ROLE_EXECUTOR';

        return $user->roles;
    }
}