
class ColorDetailResponse {
  constructor(id, name, year, color, pantone_value) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.color = color;
    this.pantone_value = pantone_value;
  }
}

module.exports.ColorDetailResponse = ColorDetailResponse;