#include "pch.h"
#include "MainService.h"
#include "MainService.g.cpp"

#include <winrt/Windows.Media.h>
#include <winrt/Windows.Foundation.h>
#include <windows.foundation.h>
#include <Unknwn.h>

using namespace winrt::Windows::Foundation;

namespace winrt::ScannerService::implementation
{
	int32_t MainService::GetScannerCount() {
		ABI::Windows::Foundation::IUriRuntimeClass *cls;

		return 0;
	}
}
