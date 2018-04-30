/* -------------------------------------------------------------------
 * Copyright (c) 2006 Wael Chatila / Icegreen Technologies. All Rights Reserved.
 * This software is released under the LGPL which is available at http://www.gnu.org/copyleft/lesser.html
 * This file has been modified by the copyright holder. Original file can be found at http://james.apache.org
 * -------------------------------------------------------------------
 */
package com.mobixell.xtt.imap.commands;

import com.mobixell.xtt.imap.ImapRequestLineReader;
import com.mobixell.xtt.imap.ImapResponse;
import com.mobixell.xtt.imap.ImapSession;
import com.mobixell.xtt.imap.ProtocolException;
import com.mobixell.xtt.store.FolderException;

/**
 * Handles processeing for the UID imap command.
 *
 * @author Darrell DeBoer <darrell@apache.org>
 * @version $Revision: 1.1 $
 */
class UidCommand extends SelectedStateCommand {
    public static final String NAME = "UID";
    public static final String ARGS = "<fetch-command>|<store-command>|<copy-command>|<search-command>";

    private ImapCommandFactory commandFactory;

    /**
     * @see CommandTemplate#doProcess
     */
    protected void doProcess(ImapRequestLineReader request,
                             ImapResponse response,
                             ImapSession session)
            throws ProtocolException, FolderException {
        String commandName = parser.atom(request);
        ImapCommand command = commandFactory.getCommand(commandName);
        if (command == null ||
                !(command instanceof UidEnabledCommand)) {
            throw new ProtocolException("Invalid UID command: '" + commandName + "'");
        }

        ((UidEnabledCommand) command).doProcess(request, response, session, true);
    }

    /**
     * @see ImapCommand#getName
     */
    public String getName() {
        return NAME;
    }

    /**
     * @see CommandTemplate#getArgSyntax
     */
    public String getArgSyntax() {
        return ARGS;
    }

    public void setCommandFactory(ImapCommandFactory imapCommandFactory) {
        this.commandFactory = imapCommandFactory;
    }
}
