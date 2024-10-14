<?php

namespace App\Http\Controllers;

use App\Models\Auditor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuditorController extends Controller
{
    //
    public function index() {
        $auditors = Auditor::all();

        return Inertia::render("Auditors/Index", [
            'auditors' => $auditors,
        ]);
    }
}
