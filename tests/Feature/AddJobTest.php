<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Company;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AddJobTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function authenticated_user_with_role_can_add_job()
    {
        // Create a user with the correct role
        $user = User::factory()->create([
            'role' => 1,
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'phone_number' => '03001234567',
            'skills' => ['PHP', 'Laravel'],
            'education' => 'BS Computer Science',
            'summary' => 'Experienced Laravel developer',
            'address' => 'Peshawar, Pakistan',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ]);

        // Simulate login via Sanctum
        $this->actingAs($user, 'sanctum');
        $company = Company::factory()->create([
            'user_id' => $user->id,
            'title' => 'Test Company',
            'description' => 'Company description',
            'locations' => 'Pakistan',
            'total_employees' => 50,
            'website' => 'https://example.com',
            'contact_information' => '123456789',
            'logo' => UploadedFile::fake()->image('logo.png'),
            'industry' => 'IT',
        ]);

        // Send POST request
        $response = $this->postJson('/api/add-job', [
            // 'user_id' => $user->id,
            // 'company_id' => $company->id,
            'title' => 'Senior Developer',
            'description' => 'We need a senior developer',
            'location' => 'Remote',
            'responsibilities' => 'Develop and maintain applications',
            'requirements' => '5+ years of experience',
            'type' => 'Full-time',
            'salary' => 70000,
        ]);

        $response->assertStatus(201); // or whatever your controller returns
        $this->assertDatabaseHas('board_jobs', [
            'title' => 'Senior Developer',
        ]);
    }

    // /** @test */
    // public function unauthenticated_user_cannot_add_job()
    // {
    //     $response = $this->postJson('/add-job', [
    //         'title' => 'Unauthorized Job',
    //     ]);

    //     $response->assertStatus(401); // Unauthorized
    // }

    // /** @test */
    // public function authenticated_user_without_role_cannot_add_job()
    // {
    //     $user = User::factory()->create([
    //         'role' => 'candidate', // role that shouldn't be able to post jobs
    //     ]);

    //     $this->actingAs($user, 'sanctum');

    //     $response = $this->postJson('/add-job', [
    //         'title' => 'Forbidden Job',
    //     ]);

    //     $response->assertStatus(403); // Forbidden
    // }
}