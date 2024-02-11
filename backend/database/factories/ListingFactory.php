<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Listing>
 */
class ListingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->title,
            'user_id' => $this->faker->numberBetween(1, 20),
            'description' => $this->faker->sentence(3),
            'quantity' => $this->faker->numberBetween(1, 10),
            'expiry_date' => $this->faker->dateTimeBetween('now', '+1 month'),
            'location' => $this->faker->city,
            
        ];
    }
}
