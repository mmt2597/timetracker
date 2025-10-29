<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    /**
     * Display a listing of employees.
     */
    public function index(Request $request)
    {
        $query = Position::query();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        // Pagination
        $perPage = $request->get('per_page', 15);
        $positions = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json($positions);
    }

    /**
     * Update the specified position.
     */
    public function update(Request $request, Position $position)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $position->update($request->all());

        return response()->json([
            'message' => 'Position updated successfully',
            'position' => $position
        ]);
    }

    /**
     * Remove the specified position.
     */
    public function destroy(Position $position)
    {
        $position->delete();

        return response()->json([
            'message' => 'Position deleted successfully'
        ]);
    }
}
