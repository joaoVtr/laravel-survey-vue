<?php

namespace Tests\Feature\Survey;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Facades\DB;

class SurveyTest extends TestCase
{
    use RefreshDatabase;

    public function user()
    {

        $user = User::factory()->create();
        return $user->createToken('teste')->plainTextToken;
    }

    public function test_create_survey()
    {

        // dd(DB::connection()->getPDO());

        $token = $this->user();

        $headers = ['Authorization' => "Bearer {$token}"];
        $data = [
            "title" => "3213123",
            "status" => true,
            "description" => "123123",
            "image" => null,
            "expire_date" => "2023-05-11",
            "questions" => []
        ];

        $response = $this->withHeaders($headers)->postJson('/api/survey', $data);

        $response->assertStatus(201);
    }
}
