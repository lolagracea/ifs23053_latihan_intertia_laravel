<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeController extends Controller
{
    public function home()
    {
        return Inertia::render('app/HomePage', [
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }
}
