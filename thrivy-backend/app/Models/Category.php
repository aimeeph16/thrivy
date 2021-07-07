<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public function features()
    {
        return $this->hasMany(CategoryFeature::class, 'category_id');
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'product_id');
    }

    public function children()
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }
    

    //recursive method which retrieves the categories from root (parent_id = 0) and 
    //appends the children if found into their parents and return them as array that contains the id, title, path, and children.
    public static function getCategoryMenuTree($parent_id = null, &$output = [])
    {
        $categories = self::where('parent_id', $parent_id)->get();
        foreach ($categories as $category) {
            $arr = [
                'id' => $category->id,
                'title' => $category->title,
                'path' => ($category->children->count() > 0 ? '#' : '/' . $category->id . '/' . self::slugify($category->title)),
                'children' => []
            ];
            if($category->children->count() > 0) {
                self::getCategoryMenuTree($category->id, $arr['children']);
            }
            $output[] = $arr;
        }
    }
}