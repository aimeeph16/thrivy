<?php


namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CategoryFeature;
use App\Traits\Helpers;
use App\Traits\HomeApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoriesController extends Controller
{
    use Helpers, HomeApi;

    public function __construct()
    {
        $this->middleware('super_admin_check:store-update-destroy');
    }

    //fetching all categories
    public function index(Request $request)
    {
        $query = Category::with('parent');

        $categories = $this->filterAndResponse($request, $query);

        return response()->json(['categories' => $categories], 200);
    }

    //updates the store
    public function store(Request $request)
    {
        $validator = Validator::make($request->only('title'), [
            'title' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => 0, 'message' => 'Please fix these errors', 'errors' => $validator->errors()], 500);
        }

        $category = new Category();

        $category->title = $request->input('title');
        $category->description = $request->input('description');
        $category->parent_id = $request->input('parent_id') != '' ? $request->input('parent_id') : null;
        $category->featured = $request->input('featured');
        $category->save();

        $this->insertFeatures($request, $category);

        return response()->json(['success' => 1, 'message' => 'Created successfully', 'category' => $category], 201);
    }

    //to display single category details
    /*
    public function show($id)
    {
        $product = Product::with('features', 'gallery', 'brand', 'category')->findOrFail($id);

        return response()->json(['product' => $product], 200);
    }
    */

    public function show($id)
    {
        $category = Category::with('parent', 'features')->findOrFail($id);

        return response()->json(['category' => $category], 200);
    }

    //update the store instead of creating a new category
    public function update(Request $request, $id)
    {
        $category = Category::with('parent')->findOrFail($id);

        $validator = Validator::make($request->only('title'), [
            'title' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => 0, 'message' => 'Please fix these errors', 'errors' => $validator->errors()], 500);
        }

        $category->title = $request->input('title');
        $category->description = $request->input('description');
        $category->parent_id = $request->input('parent_id') != '' ? $request->input('parent_id') : null;
        $category->featured = $request->input('featured');
        $category->save();

        $category->features()->delete();

        $this->insertFeatures($request, $category);

        return response()->json(['success' => 1, 'message' => 'Updated successfully', 'category' => $category], 200);
    }

    //to delete a category model
    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        $category->delete();

        return response()->json(['success' => 1, 'message' => 'Deleted successfully'], 200);
    }

    //takes the parent_id and calling it again everytime any children is detected
    public function getCategoryHtmlTree(Request $request, $parent_id = null)
    {
        $query = $categories = Category::where('parent_id', $parent_id);

        if($request->except_id) {
            $query->where('id', '!=', $request->except_id)->get();
        }

        $categories = $query->get();

        foreach ($categories as $category) {
            echo '<option value="' . $category->id . '">' . str_repeat('-', Category::getCategoryLevel($category->id)) . ' ' .  $category->title . '</option>';

            if ($category->children->count() > 0) {
                $this->getCategoryHtmlTree($request, $category->id);
            }
        }
    }

    /**
     * @param Request $request
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */

    protected function filterAndResponse(Request $request, \Illuminate\Database\Eloquent\Builder $query)
    {
        if ($request->filter_by_id) {
            $query->where('id', $request->filter_by_id);
        }

        if ($request->filter_by_title) {
            $query->where('title', 'like', "%" . $request->filter_by_title . "%");
        }

        if ($request->filter_by_parent_id) {
            $query->where('parent_id', $request->filter_by_parent_id);
        }

        $categories = $query->paginate(10);
        return $categories;
    }

    protected function insertFeatures($request, $category) {
        if($request->has('features')) {
            foreach ($request->input('features') as $feature) {
                if(!empty($feature["field_title"])) {
                    $categoryFeature = new CategoryFeature();
                    $categoryFeature->field_title = $feature["field_title"];
                    $categoryFeature->field_type = $feature["field_type"];

                    $category->features()->save($categoryFeature);
                }
            }
        }
    }
/*
    public function getCategoryMenuHtmlTree(Request $request)
    {
        return $this->getCategoryMenuTree();
    }

    public function featuredCategories(Request $request)
    {
        return $this->getFeaturedCategories();
    } */
}