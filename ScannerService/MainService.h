#pragma once
#include "MainService.g.h"

namespace winrt::ScannerService::implementation
{
    struct MainService : MainServiceT<MainService>
    {
        MainService() = default;

        int32_t GetScannerCount();

    private:
        int32_t m_temperature = 32;
    };
}
namespace winrt::ScannerService::factory_implementation
{
    struct MainService : MainServiceT<MainService, implementation::MainService>
    {
    };
}
