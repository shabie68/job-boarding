<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    @yield('styles')
    <style>
        #app {
            display: flex;
            flex-direction: column;
        }

        .gorgeous-min-height {
            min-height: 100vh;
        }

        .gorgeous-footer {
            margin-top: auto
        }

    </style>
</head>
<body class="bg-one">
    <div id="app" class="gorgeous-min-height">
        <main class="py-4">
            @yield('content')
        </main>

        @yield('scripts')
        <script>
            if(window.location.href.includes('login')) {
                document.body.classList.add('gorgeous-body')
            }
        </script>
    </div>
</body>
</html>
