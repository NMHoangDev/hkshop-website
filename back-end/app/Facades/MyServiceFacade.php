namespace App/Facades;

use Illuminate\Support\Facades\Facade;
use App\Services\MyService;

$this->app->singleton("myservice", function () {
return new MyService();
})
