<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'email' => 'admin@admin.com',
            'roles' => 'ROLE_ADMIN',
        ]);

        \App\Models\User::factory(2)->create([
            'roles' => 'ROLE_EDITOR',
        ]);

        \App\Models\Project::factory(5)->create();
    }
}
