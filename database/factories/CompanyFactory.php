<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\UploadedFile;
use App\Models\User;

class CompanyFactory extends Factory
{
    protected $model = \App\Models\Company::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(), // creates a user if not specified
            'title' => $this->faker->company,
            'description' => $this->faker->paragraph,
            'locations' => $this->faker->city,
            'total_employees' => $this->faker->numberBetween(10, 500),
            'website' => $this->faker->url,
            'contact_information' => $this->faker->phoneNumber,
            'industry' => $this->faker->word,
            'logo' => null, // you can override in test with UploadedFile::fake()
        ];
    }
}