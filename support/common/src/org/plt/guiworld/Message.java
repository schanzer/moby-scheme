package org.plt.guiworld;

public class Message implements Gui {
    // Fill me in


    public void accept(GuiVisitor v) {
	v.visit(this);
    }
}