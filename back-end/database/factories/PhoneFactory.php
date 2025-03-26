<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Phone>
 */
class PhoneFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'name' => $this->faker->randomElement([
                'iPhone 13 Pro Max',
                'iPhone 12 Mini',
                'Samsung Galaxy S21 Ultra',
                'Samsung Galaxy Note 20',
                'Huawei P40 Pro',
                'Xiaomi Mi 11',
                'Oppo Find X3 Pro',
                'Vivo X60 Pro',
                'OnePlus 9 Pro',
                'Google Pixel 6',
                'Sony Xperia 1 III',
                'Nokia 8.3 5G',
                'Realme GT',
                'Motorola Edge 20 Pro',
                'Asus ROG Phone 5',
                'Lenovo Legion Phone Duel',
                'Honor 50',
                'LG Velvet',
                'Meizu 18',
                'ZTE Axon 30'
            ]),
            "ram" => $this->faker->randomElement([4, 6, 8, 12]),
            'price' => $this->faker->numberBetween(3000000, 30000000),
            "frequency" => $this->faker->randomElement([60, 90, 120, 144, 165]),
            "pin" => $this->faker->randomElement([
                3000,
                3500,
                4000,
                4500,
                5000
            ]),
            'screen' => $this->faker->randomElement([
                5.0,
                5.2,
                5.5,
                5.8,
                6.0,
                6.1,
                6.2,
                6.3,
                6.4,
                6.5,
                6.7,
                6.9,
                7.0,
                7.2,
                8.0,
                8.4,
                9.0,
                10.0,
                10.5,
                12.0
            ]),
            'nameChip' => $this->faker->randomElement([
                'Apple A15 Bionic',
                'Apple A14 Bionic',
                'Qualcomm Snapdragon 888',
                'Qualcomm Snapdragon 870',
                'Qualcomm Snapdragon 865',
                'Samsung Exynos 2100',
                'Samsung Exynos 990',
                'MediaTek Dimensity 1200',
                'MediaTek Dimensity 1100',
                'Kirin 9000',
                'Kirin 990',
                'Qualcomm Snapdragon 778G',
                'Qualcomm Snapdragon 750G',
                'Qualcomm Snapdragon 732G',
                'MediaTek Helio G95',
                'Qualcomm Snapdragon 480',
                'MediaTek Dimensity 700',
                'Qualcomm Snapdragon 460',
                'Exynos 9611',
                'MediaTek Helio P35'
            ]),
            "imagesUrl" => $this->faker->randomElement([
                "https://cdn.tgdd.vn/Products/Images/42/213031/iphone-12-xanh-la-1-1-750x500.jpg",
                "https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture//Apro/Apro_product_33366/samsung-galaxy-_main_334_1020.png.webp"

            ]),
            'quantity' => $this->faker->numberBetween(1, 200),
            "color" => $this->faker->randomElement(["yellow", "green", "blue", "white", "black"])








        ];
    }
}
