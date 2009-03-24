package org.plt.lib;

import org.plt.types.*;
import org.plt.platform.Platform;

public class Net {
    public static Object getUrl(Object url) {
	TiltService service = 
	    Platform.getInstance().getNetworkService();
	return service.getUrl(url.toString());
    }
}
