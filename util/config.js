const IMAGE_FIELDS_ARRAY = [
    { name: 'view_1', maxCount: 1, id:1 },
    { name: 'view_2', maxCount: 1, id:2 },
    { name: 'view_3', maxCount: 1, id:3 },
    // { name: 'view_4', maxCount: 1, id:4 },
    // { name: 'view_5', maxCount: 1, id:5 }
]

const BAG_SIZES_ARRAY = [
    { name: '5X6', weight_from: '500', weight_to: '600', id:1, 'unit': 'grams' },
    { name: '7X8', weight_from: '1.5', weight_to: '2', id:2, 'unit': 'kg' }, 
    { name: '8X10', weight_from: '3.5', weight_to: '4', id:3, 'unit': 'kg' }, 
    { name: '9X11', weight_from: '4', weight_to: '6', id:4, 'unit': 'kg' }, 
    { name: '13X13', weight_from: '9', weight_to: '10', id:5, 'unit': 'kg' }, 
    { name: '15X16', weight_from: '18', weight_to: '20', id:6, 'unit': 'kg' }, 
    { name: '18X18', weight_from: '27', weight_to: '30', id:7, 'unit': 'kg' }, 
    { name: '21X21', weight_from: '45', weight_to: '50', id:8, 'unit': 'kg' }, 
    { name: '25X25', weight_from: '60', weight_to: '75', id:9, 'unit': 'kg' }, 
    { name: '30X30', weight_from: '110', weight_to: '120', id:`0`, 'unit': 'kg' }, 
]

const DESCRIPTION_CATEGORY_ARRAY = [
    { name: 'Category 1', id:1 },
    { name: 'Category 2', id:2 },
    { name: 'Category 3', id:3 },
    { name: 'Category 4', id:4 },
    { name: 'Category 5', id:5 }
]

const SHOW_TABLE_COLS = [
    {"col_name": "date", "title": "Date", "type": "text"},
    {"col_name": "plant_name", "title": "Plant", "type": "link"},
    {"col_name": "plant_price", "title": "Price", "type": "text"},
    {"col_name": "plant_bag_size", "title": "Size", "type": "text"},
    {"col_name": "plant_height", "title": "Height", "type": "text"},
    {"col_name": "plant_category_type", "title": "Category", "type": "text"},
    {"col_name": "plant_description", "title": "Description", "type": "text"},
    {"col_name": "link_0", "title": "View 1", "type": "image"},
    {"col_name": "link_1", "title": "View 2", "type": "image"},
    {"col_name": "link_2", "title": "View 3", "type": "image"},
    // {"col_name": "link_3", "title": "View 4", "type": "image"},
    // {"col_name": "link_4", "title": "View 5", "type": "image"}
]

const SHOW_CATEGORY_TABLE_COLS = [
    {"col_name": "date", "title": "Date", "type": "text"},
    {"col_name": "category_name", "title": "Category", "type": "link"},
    {"col_name": "link_0", "title": "View 1", "type": "image"},
]

module.exports = {
    "IMAGE_FIELDS_ARRAY": IMAGE_FIELDS_ARRAY,
    "BAG_SIZES_ARRAY": BAG_SIZES_ARRAY,
    "DESCRIPTION_CATEGORY_ARRAY": DESCRIPTION_CATEGORY_ARRAY,
    "SHOW_TABLE_COLS": SHOW_TABLE_COLS,
    "SHOW_CATEGORY_TABLE_COLS": SHOW_CATEGORY_TABLE_COLS
}
